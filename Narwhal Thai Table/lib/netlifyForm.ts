/**
 * Submit a form to Netlify Forms.
 *
 * Netlify detects forms (and their field names) from static HTML at build time
 * — see public/__forms.html. The React forms post here as URL-encoded data with
 * a `form-name` field that matches one of those detected forms.
 */
export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const params = new URLSearchParams();
  new FormData(form).forEach((value, key) => {
    params.append(key, typeof value === 'string' ? value : '');
  });

  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) throw new Error(`Form submit failed (${res.status})`);
}
