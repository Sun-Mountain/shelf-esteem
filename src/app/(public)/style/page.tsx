import ColorShield from "@components/StyleGuide/ColorShield";

const StyleGuide = () => {
  return (
    <section>
      <h1>Style Guide</h1>
      <div>
        <h2>Color Guide</h2>
        <div className="shields-container">
          <ColorShield title="base" name="Eggshell" rgbCode="rgb(0, 123, 255)" />
          <ColorShield title="primary" name="Delft Blue" rgbCode="rgb(102, 79, 92)" lightText={true} />
          <ColorShield title="secondary" name="Sunset" rgbCode="rgb(242, 204, 143)" />
          <ColorShield title="tertiary" name="Sage" rgbCode="rgb(186, 191, 149)" />
          <ColorShield title="accent" name="Neon Blue" rgbCode="rgb(67, 97, 238)" lightText={true} />
          <ColorShield title="neutral" name="Rose Taupe" rgbCode="rgb(143, 93, 93)" lightText={true} />
          <div className="color-shield">
            <div className="color-stripe greyscale1-color white-text">
              Eerie-Black: rgb(33, 37, 41)
            </div>
            <div className="color-stripe greyscale2-color white-text">
              Onyx: rgb(52, 58, 64)
            </div>
            <div className="color-stripe greyscale3-color white-text">
              Outer-Space: rgb(73, 80, 87)
            </div>
            <div className="color-stripe greyscale4-color white-text">
              Slate-Gray: rgb(108, 117, 125)
            </div>
            <div className="color-stripe greyscale5-color">
              French-Gray-2: rgb(173, 181, 189)
            </div>
            <div className="color-stripe greyscale6-color">
              French-Gray: rgb(206, 212, 218)
            </div>
            <div className="color-stripe greyscale7-color">
              Seasalt: rgb(248, 249, 250)
            </div>
            <div className="color-stripe greyscale8-color">
              Antiflash-White: rgb(233, 236, 239)
            </div>
            <div className="color-stripe greyscale9-color">
              Platinum: rgb(222, 226, 230)
            </div>
            <div className="color-stripe greyscale10-color">
              White: rgb(255, 255, 255)
            </div>
            <div className="color-details">
              <div className="detail title">Shadows</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Typography</h2>
        <div>
          <h3>Headers</h3>
          <h1>H1: Roboto, 3rem</h1>
          <h2>H2: Roboto, 2.75rem</h2>
          <h3>H3: Roboto, 2.125rem</h3>
          <h4>H4: Roboto, 2rem</h4>
          <h5>H5: Roboto, 1.75rem</h5>
          <h6>H6: Roboto, 1.5rem</h6>
        </div>
        <div>
          <h3>Body Text</h3>
          <p>Text, Roboto 1.125rem</p>
        </div>
      </div>
      <div>
        <h2>Buttons</h2>
      </div>
      <div>
        <h2>Forms</h2>
      </div>
    </section>
  )
}

export default StyleGuide