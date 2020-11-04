const SERVICE_URL = 'https://formspree.io/f/xeqpkpar'

export const sendEmail = async (data: FormData) => {
  const response = await fetch(SERVICE_URL, {
    method: 'POST',
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('SEND_EMAIL_FAILURE')
  }
}
