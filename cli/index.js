#!/usr/bin/env node

import { parseArgs } from 'node:util'
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { resolve, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
const SHOWCASE_FILE = resolve(ROOT_DIR, 'public/showcase.json')
const SHOWCASE_IMG_DIR = resolve(ROOT_DIR, 'public/assets/showcase')

// Color helpers
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
}

function success(msg) { console.log(`${c.green}✓${c.reset} ${msg}`) }
function error(msg) { console.error(`${c.red}✗${c.reset} ${msg}`) }
function warn(msg) { console.log(`${c.yellow}⚠${c.reset} ${msg}`) }
function info(msg) { console.log(`${c.cyan}ℹ${c.reset} ${msg}`) }
function heading(msg) { console.log(`\n${c.bold}${msg}${c.reset}`) }

function loadShowcase() {
  if (!existsSync(SHOWCASE_FILE)) {
    return { showcase: [], testimonials: [] }
  }
  return JSON.parse(readFileSync(SHOWCASE_FILE, 'utf-8'))
}

function saveShowcase(data) {
  writeFileSync(SHOWCASE_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function parseCommaList(value) {
  if (!value) return []
  return value.split(',').map(item => item.trim()).filter(Boolean)
}

// Generate slug ID from title
function generateId(judul) {
  return 'proj-' + judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

// Validate GitHub URL format
function isValidGithubUrl(url) {
  return /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/.test(url)
}

// Validate URL format (general)
function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Process image: if local file path, copy to showcase assets folder
function processImage(imagePath, id) {
  if (!imagePath) return ''

  // If it's already a URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // If it's already a project-relative path starting with /assets/
  if (imagePath.startsWith('/assets/showcase/')) {
    return imagePath
  }

  // If it's a local file, copy to public/assets/showcase/
  const resolvedPath = resolve(process.cwd(), imagePath)
  if (!existsSync(resolvedPath)) {
    warn(`File gambar "${imagePath}" tidak ditemukan. Path akan tetap disimpan.`)
    return imagePath
  }

  // Ensure showcase directory exists
  if (!existsSync(SHOWCASE_IMG_DIR)) {
    mkdirSync(SHOWCASE_IMG_DIR, { recursive: true })
  }

  // Generate filename: id + extension
  const ext = extname(resolvedPath) || '.png'
  const destFilename = `${id}${ext}`
  const destPath = resolve(SHOWCASE_IMG_DIR, destFilename)

  copyFileSync(resolvedPath, destPath)
  success(`Gambar di-copy ke: public/assets/showcase/${destFilename}`)

  return `/assets/showcase/${destFilename}`
}

function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command || command === '--help' || command === '-h') {
    printHelp()
    return
  }

  if (command === 'add') {
    handleAdd(args.slice(1))
  } else if (command === 'list') {
    handleList()
  } else if (command === 'remove') {
    handleRemove(args.slice(1))
  } else {
    error(`Perintah "${command}" tidak dikenali.`)
    console.log(`Jalankan ${c.cyan}npx kelasphp-showcase --help${c.reset} untuk bantuan.`)
    process.exit(1)
  }
}

function printHelp() {
  heading('🚀 kelasphp-showcase - CLI untuk kontribusi showcase proyek')
  console.log(`
${c.bold}USAGE:${c.reset}
  npx kelasphp-showcase <command> [options]

${c.bold}COMMANDS:${c.reset}
  add       Tambah proyek showcase baru
  list      Lihat semua proyek showcase
  remove    Hapus proyek berdasarkan ID

${c.bold}ADD OPTIONS:${c.reset}
  --id <string>          ID unik proyek (opsional, auto-generate dari judul)
  --judul <string>       Judul proyek ${c.red}(wajib)${c.reset}
  --deskripsi <string>   Deskripsi singkat proyek ${c.red}(wajib)${c.reset}
  --gambar <string>      Gambar screenshot (path lokal atau URL)
  --nama <string>        Nama peserta ${c.red}(wajib)${c.reset}
  --tech <string>        Teknologi yang dipakai, pisah koma ${c.red}(wajib)${c.reset}
  --github <string>      URL repository GitHub ${c.red}(wajib)${c.reset}
  --demo <string>        URL live demo (opsional, default = github)

${c.bold}GAMBAR:${c.reset}
  Gambar bisa diisi dengan:
  • Path file lokal  → otomatis di-copy ke public/assets/showcase/
  • URL (https://...) → disimpan langsung sebagai URL
  • Kosongkan        → bisa ditambah nanti

  Contoh path lokal:
    --gambar "./screenshot.png"
    --gambar "D:/gambar/proyek-saya.jpg"

  Format yang didukung: .png, .jpg, .jpeg, .webp, .gif

${c.bold}CONTOH:${c.reset}
  npx kelasphp-showcase add \\
    --judul "To-Do List Application" \\
    --deskripsi "Aplikasi manajemen tugas berbasis web dengan fitur CRUD" \\
    --gambar "./screenshot.png" \\
    --nama "Budi Santoso" \\
    --tech "PHP,MySQL,Bootstrap" \\
    --github "https://github.com/budi/todo-app" \\
    --demo "https://todo-app.vercel.app"

  ${c.dim}# ID akan otomatis di-generate: proj-to-do-list-application${c.reset}

${c.bold}WORKFLOW KONTRIBUSI:${c.reset}
  1. Fork & clone repo
  2. npm install
  3. Jalankan command ${c.cyan}npx kelasphp-showcase add${c.reset} dengan data proyek kamu
  4. git add public/showcase.json public/assets/showcase/
  5. git commit -m "feat: add showcase [nama-proyek]"
  6. Push & buat Pull Request
`)
}

function handleAdd(rawArgs) {
  const options = {
    id: { type: 'string' },
    judul: { type: 'string' },
    deskripsi: { type: 'string' },
    gambar: { type: 'string' },
    nama: { type: 'string' },
    tech: { type: 'string' },
    github: { type: 'string' },
    demo: { type: 'string' },
  }

  let parsed
  try {
    parsed = parseArgs({ args: rawArgs, options, allowPositionals: false })
  } catch (err) {
    error(`Gagal parse argumen: ${err.message}`)
    process.exit(1)
  }

  const vals = parsed.values

  // Validate required fields
  const required = ['judul', 'deskripsi', 'nama', 'tech', 'github']
  const missing = required.filter(key => !vals[key])

  if (missing.length > 0) {
    error(`Field wajib belum diisi: ${missing.join(', ')}`)
    console.log(`Jalankan ${c.cyan}npx kelasphp-showcase --help${c.reset} untuk melihat opsi.`)
    process.exit(1)
  }

  // Validate GitHub URL
  if (!isValidGithubUrl(vals.github)) {
    error(`URL GitHub tidak valid: "${vals.github}"`)
    info(`Format yang benar: https://github.com/username/repo-name`)
    process.exit(1)
  }

  // Validate demo URL if provided
  if (vals.demo && !isValidUrl(vals.demo)) {
    error(`URL demo tidak valid: "${vals.demo}"`)
    process.exit(1)
  }

  // Auto-generate ID if not provided
  const id = vals.id || generateId(vals.judul)

  // Process image
  const gambar = processImage(vals.gambar, id)

  // Build entry (sesuai format showcase.json yang sudah ada)
  const entry = {
    id,
    judul: vals.judul,
    deks: vals.deskripsi,
    gambar,
    namaPeserta: vals.nama,
    tech: parseCommaList(vals.tech),
    github: vals.github,
    project: vals.demo || vals.github,
  }

  // Load data
  const data = loadShowcase()

  // Check for duplicate ID
  if (data.showcase.some(item => item.id === entry.id)) {
    error(`Proyek dengan ID "${entry.id}" sudah ada!`)
    info(`Gunakan --id dengan nilai lain, atau hapus dulu dengan: npx kelasphp-showcase remove --id ${entry.id}`)
    process.exit(1)
  }

  // Check for duplicate peserta name (warning only)
  const existingByName = data.showcase.find(
    item => item.namaPeserta.toLowerCase() === entry.namaPeserta.toLowerCase()
  )
  if (existingByName) {
    warn(`Peserta "${entry.namaPeserta}" sudah punya proyek: "${existingByName.judul}"`)
    info(`Tidak masalah kalau memang ingin menambah proyek kedua.`)
    console.log('')
  }

  // Add entry
  data.showcase.push(entry)
  saveShowcase(data)

  heading('🎉 Berhasil menambahkan showcase baru!')
  console.log('')
  console.log(`  ${c.bold}ID:${c.reset}       ${entry.id}`)
  console.log(`  ${c.bold}Judul:${c.reset}    ${entry.judul}`)
  console.log(`  ${c.bold}Peserta:${c.reset}  ${entry.namaPeserta}`)
  console.log(`  ${c.bold}Tech:${c.reset}     ${entry.tech.join(', ')}`)
  console.log(`  ${c.bold}Gambar:${c.reset}   ${entry.gambar || '(belum diisi)'}`)
  console.log(`  ${c.bold}GitHub:${c.reset}   ${entry.github}`)
  console.log(`  ${c.bold}Demo:${c.reset}     ${entry.project}`)
  console.log('')
  info(`Data tersimpan di: public/showcase.json`)
  info(`Selanjutnya: commit dan buat Pull Request!`)
  console.log('')
  console.log(`  ${c.dim}git add public/showcase.json public/assets/showcase/`)
  console.log(`  git commit -m "feat: add showcase ${entry.id}"`)
  console.log(`  git push origin nama-branch${c.reset}`)
  console.log('')
}

function handleList() {
  const data = loadShowcase()

  if (data.showcase.length === 0) {
    info('Belum ada proyek showcase.')
    return
  }

  heading(`📋 Daftar Showcase (${data.showcase.length} proyek)`)
  console.log('')

  data.showcase.forEach((item, i) => {
    console.log(`  ${i + 1}. ${c.bold}${item.judul}${c.reset}`)
    console.log(`     ID: ${item.id} | Peserta: ${item.namaPeserta} | Tech: ${item.tech.join(', ')}`)
    console.log(`     GitHub: ${item.github}`)
    console.log('')
  })
}

function handleRemove(rawArgs) {
  const options = {
    id: { type: 'string' },
  }

  let parsed
  try {
    parsed = parseArgs({ args: rawArgs, options, allowPositionals: false })
  } catch (err) {
    error(`Gagal parse argumen: ${err.message}`)
    process.exit(1)
  }

  const id = parsed.values.id
  if (!id) {
    error('--id wajib diisi.')
    info('Lihat daftar ID dengan: npx kelasphp-showcase list')
    process.exit(1)
  }

  const data = loadShowcase()
  const idx = data.showcase.findIndex(item => item.id === id)

  if (idx === -1) {
    error(`Proyek dengan ID "${id}" tidak ditemukan.`)
    info('Lihat daftar ID dengan: npx kelasphp-showcase list')
    process.exit(1)
  }

  const removed = data.showcase.splice(idx, 1)[0]
  saveShowcase(data)

  success(`Proyek "${removed.judul}" (${id}) berhasil dihapus.`)
}

main()
