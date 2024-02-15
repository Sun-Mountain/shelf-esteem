import { Alert, AlertTitle } from "@mui/material";

const AlertItem = ({
  message,
  severity,
  title,
  ...rest
}: {
  message: string
  severity: "error" | "warning" | "info" | "success"
  title: string
  rest?: any
}) => {
  const alertTitle = title || `${severity[0].toUpperCase()}${severity.slice(1)}`

  return (
    <Alert severity={severity}>
      <AlertTitle>{alertTitle}</AlertTitle>
      {message}
    </Alert>
  )
}

export default AlertItem