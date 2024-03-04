export const YANDEX_API = 'https://ya-praktikum.tech/api/v2'

export const API_HOST = (typeof process !== 'undefined' ? process.env?.API_HOST : '') || 'http://localhost:3001'

/** Хосты, с которых можно ходить на API Яндекса */
export const allowedHosts = ['localhost', '127.0.0.1', new URL(API_HOST).hostname]

export const NONCE = '%nonce%'
export const TLD = '%tld%'
