export function normalizeDomain(input) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('Invalid domain: provide a hostname or HTTP(S) URL');
  }

  const value = input.trim();
  let hostname;
  if (value.includes('://')) {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error('Invalid domain: malformed URL');
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Invalid domain: only HTTP(S) URLs are supported');
    }
    hostname = url.hostname;
  } else {
    hostname = value;
  }

  hostname = hostname.toLowerCase();
  const labels = hostname.split('.');
  if (hostname.length > 253 || labels.length < 2 || labels.some(label =>
    label.length < 1 || label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)
  )) {
    throw new Error('Invalid domain: hostname must contain valid dot-separated labels');
  }
  return hostname;
}
