import { Alert as MuiAlert, AlertTitle } from "@mui/material";

const Alert = ({
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
    <MuiAlert severity={severity}>
      <AlertTitle>{alertTitle}</AlertTitle>
      {message}
    </MuiAlert>
  )
}

export default Alert