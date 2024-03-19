interface ColorShieldProps {
  title: string;
  name: string;
  rgbCode: string;
  lightText?: boolean;
}

const ColorShield = ({
  title,
  name,
  rgbCode,
  lightText = false
}: ColorShieldProps) => {
  return (
    <div className="color-shield">
      <div className={`color-stripe ${title}-color ${lightText ? 'white-text' : ''}`}>
        {rgbCode}
      </div>
      <div className={`color-stripe ${title}50-color`}>
        50%
      </div>
      <div className={`color-stripe ${title}30-color`}>
        30%
      </div>
      <div className={`color-stripe ${title}10-color`}>
        10%
      </div>
      <div className={`color-stripe ${title}05-color`}>
        5%
      </div>
      <div className="color-details">
        <div className="detail title">{title.charAt(0).toUpperCase() + title.slice(1)}</div>
        <div className="detail name">{name}</div>
      </div>
    </div>
  )
}

export default ColorShield