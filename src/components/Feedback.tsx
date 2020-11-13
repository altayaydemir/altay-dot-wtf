import { useCallback, useState } from 'react'
import { sendEmail } from 'core/api/email'
import { Box, Heading, Text, Button, Flex, SxStyleProp } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'

const config = {
  copy: {
    headingIcon: '🙇‍♂️',
    heading: 'A huge favor',
    description: `
      Please let me know if anything you read here was confusing, incorrect, or outdated.
      Just write a few words, and I will be grateful to you for the rest of my life.
    `,
    optional: '(Optional)',
    submit: 'Send',
    submitBusy: 'Sending...',
  },
  fields: [
    {
      name: 'message',
      type: 'textarea',
      label: 'What should I know?',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Your email address',
      required: false,
    },
    {
      name: 'twitter',
      type: 'text',
      label: 'Your twitter handle',
      required: false,
    },
  ],
}

type FeedbackState =
  | { type: 'pristine' }
  | { type: 'sending' }
  | { type: 'success' }
  | { type: 'failure'; error: unknown }

const feedbackMessageStyle: SxStyleProp = {
  paddingY: 2,
  paddingX: 4,
  borderRadius: 8,
  fontWeight: 'bold',
  color: 'textWhite',
  textAlign: 'center',
}

const FeedBackMessage: React.FC<{ feedbackState: FeedbackState }> = ({ feedbackState }) => {
  switch (feedbackState.type) {
    case 'success':
      return (
        <Text sx={feedbackMessageStyle} backgroundColor="green">
          I got your message, thank you!
        </Text>
      )

    case 'failure':
      return (
        <Text sx={feedbackMessageStyle} backgroundColor="red">
          Oops, an error occurred 😅
        </Text>
      )

    default:
      return null
  }
}

const Feedback = () => {
  const [state, setState] = useState<FeedbackState>({ type: 'pristine' })

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState({ type: 'sending' })

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append('path', window.location.pathname)

    try {
      await sendEmail(formData)
      setState({ type: 'success' })
    } catch (error) {
      setState({ type: 'failure', error })
    }
  }, [])

  return (
    <Box backgroundColor="backgroundSecondary" p={4} sx={{ borderRadius: 8 }}>
      <Box display="inline-flex" sx={{ alignItems: 'center' }}>
        <Text fontSize={3}>{config.copy.headingIcon}</Text>
        <Box mx={1} />
        <Heading fontSize={3}>{config.copy.heading}</Heading>
      </Box>

      <Box my={2} />

      <Text color="textSecondary">{config.copy.description}</Text>

      <Box my={3} />

      <form onSubmit={handleSubmit}>
        {config.fields.map(({ label, ...field }) => (
          <Box key={field.name} mb={3}>
            <Label htmlFor={field.name} fontSize={1}>
              {label} {field.required ? null : config.copy.optional}
            </Label>

            <Box m={2} />

            {field.type === 'textarea' ? (
              <Textarea {...field} placeholder={label} />
            ) : (
              <Input {...field} placeholder={label} />
            )}
          </Box>
        ))}

        <Flex flexDirection="column" alignItems="flex-end">
          <Button disabled={state.type === 'sending'} minWidth={100}>
            {state.type === 'sending' ? config.copy.submitBusy : config.copy.submit}
          </Button>
        </Flex>

        <Box m={3} />

        <FeedBackMessage feedbackState={state} />
      </form>
    </Box>
  )
}

export default Feedback
