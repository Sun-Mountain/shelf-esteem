import ColorShield from "@components/StyleGuide/ColorShield";

const StyleGuide = () => {
  return (
    <section>
      <h1>Style Guide</h1>
      <div className="group">
        <h2>Color Guide</h2>
        <div className="shields-container">
          <ColorShield title="base" name="Eggshell" rgbCode="rgb(0, 123, 255)" />
          <ColorShield title="base-cool" name="Cambridge Blue" rgbCode="rgb(129, 178, 154)" />
          <ColorShield title="base-warm" name="Apricot" rgbCode="rgb(234, 182, 159)" />
          <ColorShield title="primary" name="Delft Blue" rgbCode="rgb(61, 64, 91)" lightText={true} />
          <ColorShield title="secondary" name="Sunset" rgbCode="rgb(242, 204, 143)" />
          <ColorShield title="tertiary" name="Sage" rgbCode="rgb(186, 191, 149)" />
          <ColorShield title="accent" name="Neon Blue" rgbCode="rgb(67, 97, 238)" lightText={true} />
          <ColorShield title="accent-success" name="Kelly Green" rgbCode="rgb(41, 191, 18)" lightText={true} />
          <ColorShield title="accent-error" name="Cardinal" rgbCode="rgb(199, 31, 55)" lightText={true} />
          <ColorShield title="neutral" name="Rose Taupe" rgbCode="rgb(143, 93, 93)" lightText={true} />
          <ColorShield title="neutral-cool" name="Eggplant" rgbCode="rgb(102, 79, 92)" lightText={true} />
          <div className="color-shield">
            <div className="color-stripe shadow01-color white-text">
              Eerie-Black: rgb(33, 37, 41)
            </div>
            <div className="color-stripe shadow02-color white-text">
              Onyx: rgb(52, 58, 64)
            </div>
            <div className="color-stripe shadow03-color white-text">
              Outer-Space: rgb(73, 80, 87)
            </div>
            <div className="color-stripe shadow04-color white-text">
              Slate-Gray: rgb(108, 117, 125)
            </div>
            <div className="color-stripe shadow05-color">
              French-Gray-2: rgb(173, 181, 189)
            </div>
            <div className="color-stripe shadow06-color">
              French-Gray: rgb(206, 212, 218)
            </div>
            <div className="color-stripe shadow07-color">
              Seasalt: rgb(248, 249, 250)
            </div>
            <div className="color-stripe shadow08-color">
              Antiflash-White: rgb(233, 236, 239)
            </div>
            <div className="color-stripe shadow09-color">
              Platinum: rgb(222, 226, 230)
            </div>
            <div className="color-details">
              <div className="detail title">Shadows</div>
              <div className="detail name">Multi</div>
            </div>
          </div>
        </div>
      </div>
      <div className="group">
        <h2>Typography</h2>
        <div className="typograph-container">
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
      </div>
      <div className="group">
        <h2>Buttons</h2>
      </div>
      <div className="group">
        <h2>Forms</h2>
      </div>
    </section>
  )
}

export default StyleGuide