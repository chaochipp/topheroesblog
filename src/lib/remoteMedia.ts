const privateIPv4Patterns = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
]

const localhostHosts = new Set(['localhost', '0.0.0.0', '::1'])

export const isSafeRemoteURL = (value: string): boolean => {
  try {
    const url = new URL(value)

    if (!['http:', 'https:'].includes(url.protocol)) {
      return false
    }

    if (localhostHosts.has(url.hostname)) {
      return false
    }

    if (privateIPv4Patterns.some((pattern) => pattern.test(url.hostname))) {
      return false
    }

    return true
  } catch {
    return false
  }
}
