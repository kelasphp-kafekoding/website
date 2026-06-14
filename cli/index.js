#!/usr/bin/env node

import { parseArgs } from 'node:util'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
const SHOWCASE_FILE = resolve(ROOT_DIR, 'public/showcase.json')

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
  --id <string>          ID unik proyek (format: slug, contoh: proj-todo-app)
  --judul <string>       Judul proyek
  --deskripsi <string>   Deskripsi singkat proyek
  --gambar <string>      URL/path gambar screenshot proyek
  --nama <string>        Nama peserta
  --tech <string>        Teknologi yang dipakai (pisahkan dengan ",")
  --github <string>      URL repository GitHub
  --demo <string>        URL live demo (opsional, default = github)

${c.bold}CONTOH:${c.reset}
  npx kelasphp-showcase add \\
    --id proj-todo-app \\
    --judul "To-Do List Application" \\
    --deskripsi "Aplikasi manajemen tugas berbasis web dengan fitur CRUD" \\
    --gambar "https://i.imgur.com/screenshot.png" \\
    --nama "Budi Santoso" \\
    --tech "PHP,MySQL,Bootstrap" \\
    --github "https://github.com/budi/todo-app" \\
    --demo "https://todo-app.vercel.app"

${c.bold}WORKFLOW KONTRIBUSI:${c.reset}
  1. Fork & clone repo
  2. npm install
  3. Jalankan command ${c.cyan}npx kelasphp-showcase add${c.reset} dengan data proyek kamu
  4. git add public/showcase.json
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
  const required = ['id', 'judul', 'deskripsi', 'nama', 'tech', 'github']
  const missing = required.filter(key => !vals[key])

  if (missing.length > 0) {
    error(`Field wajib belum diisi: ${missing.join(', ')}`)
    console.log(`Jalankan ${c.cyan}npx kelasphp-showcase add --help${c.reset} untuk melihat opsi.`)
    process.exit(1)
  }

  // Build entry (sesuai format showcase.json yang sudah ada)
  const entry = {
    id: vals.id,
    judul: vals.judul,
    deks: vals.deskripsi,
    gambar: vals.gambar || '',
    namaPeserta: vals.nama,
    tech: parseCommaList(vals.tech),
    github: vals.github,
    project: vals.demo || vals.github,
  }

  // Load and check for duplicate
  const data = loadShowcase()

  if (data.showcase.some(item => item.id === entry.id)) {
    error(`Proyek dengan ID "${entry.id}" sudah ada!`)
    info(`Gunakan ID lain atau hapus dulu dengan: npx kelasphp-showcase remove --id ${entry.id}`)
    process.exit(1)
  }

  // Add
  data.showcase.push(entry)
  saveShowcase(data)

  heading('🎉 Berhasil menambahkan showcase baru!')
  console.log('')
  console.log(`  ${c.bold}ID:${c.reset}       ${entry.id}`)
  console.log(`  ${c.bold}Judul:${c.reset}    ${entry.judul}`)
  console.log(`  ${c.bold}Peserta:${c.reset}  ${entry.namaPeserta}`)
  console.log(`  ${c.bold}Tech:${c.reset}     ${entry.tech.join(', ')}`)
  console.log(`  ${c.bold}GitHub:${c.reset}   ${entry.github}`)
  console.log(`  ${c.bold}Demo:${c.reset}     ${entry.project}`)
  console.log('')
  info(`Data tersimpan di: public/showcase.json`)
  info(`Selanjutnya: commit dan buat Pull Request!`)
  console.log('')
  console.log(`  ${c.dim}git add public/showcase.json`)
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
    process.exit(1)
  }

  const data = loadShowcase()
  const idx = data.showcase.findIndex(item => item.id === id)

  if (idx === -1) {
    error(`Proyek dengan ID "${id}" tidak ditemukan.`)
    process.exit(1)
  }

  const removed = data.showcase.splice(idx, 1)[0]
  saveShowcase(data)

  success(`Proyek "${removed.judul}" (${id}) berhasil dihapus.`)
}

main()
