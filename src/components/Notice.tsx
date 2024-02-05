
import { FC, ReactNode } from "react";

interface NoticeProps {
  children: ReactNode
}

const Notice: FC<NoticeProps> = ({ children }) => {
  return (
    <div className="notice">
      {children}
    </div>
  )
}

export default Notice