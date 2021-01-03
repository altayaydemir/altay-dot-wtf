import { useCallback, useState } from 'react'
import { sendEmail } from 'core/api/email'
import { Box, Heading, Text, Button, Flex, SxStyleProp } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'

const config = {
  copy: {
    headingIcon: '🙋‍♂️',
    heading: 'Thanks for reading!',
    description: `
      Please let me know if anything you read was confusing or incorrect.
      Just write a few words, and I'll be grateful to you for the rest of my life.
    `,
    optional: '(Optional)',
    submit: 'Send',
    submitBusy: 'Sending...',
  },
  fields: {
    message: {
      name: 'message',
      type: 'textarea',
      label: 'What should I know?',
      required: true,
    },
    email: {
      name: 'email',
      type: 'email',
      label: 'Your email address',
      required: false,
    },
    twitter: {
      name: 'twitter',
      type: 'text',
      label: 'Your Twitter handle',
      required: false,
    },
  },
}

type FeedbackState =
  | { type: 'pristine' }
  | { type: 'sending' }
  | { type: 'success' }
  | { type: 'failure'; error: unknown }

const feedbackMessageStyle: SxStyleProp = {
  paddingY: 2,
  paddingX: 4,
  borderRadius: 6,
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

const Field: React.FC<{
  field: { name: string; required: boolean; label: string; type: string }
}> = ({ field }) => (
  <Box>
    <Label htmlFor={field.name} fontSize={1}>
      {field.label} {field.required ? null : config.copy.optional}
    </Label>

    <Box m={1} />

    {field.type === 'textarea' ? (
      <Textarea {...field} placeholder={field.label} />
    ) : (
      <Input {...field} placeholder={field.label} />
    )}
  </Box>
)

const Feedback: React.FC = () => {
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
    <Box backgroundColor="backgroundSecondary" p={4} sx={{ borderRadius: 6 }}>
      <Box display="inline-flex" sx={{ alignItems: 'flex-end' }}>
        <Text fontSize={[2, 3]}>{config.copy.headingIcon}</Text>
        <Box mx={1} />
        <Heading fontSize={[2, 3]}>{config.copy.heading}</Heading>
      </Box>

      <Text my={3} color="textSecondary">
        {config.copy.description}
      </Text>

      <form onSubmit={handleSubmit}>
        <Field field={config.fields.message} />

        <Box m={3} />

        <Flex flexDirection={['column', 'row']}>
          <Box width={[1, 1 / 2]}>
            <Field field={config.fields.email} />
          </Box>

          <Box m={[2, 1]} />

          <Box width={[1, 1 / 2]}>
            <Field field={config.fields.twitter} />
          </Box>
        </Flex>

        <Box m={3} />

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
