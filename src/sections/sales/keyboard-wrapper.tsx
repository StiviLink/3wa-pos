import { Component } from "react"
import Keyboard, {KeyboardReactInterface} from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"
import "./style/sales-point-keyboard.css"

const noop = () => {}

interface IProps {
    keyboardRef: (r: KeyboardReactInterface) => void
    onChange: (input: string) => void
}

class KeyboardWrapper extends Component<IProps> {

    onKeyPress = (button: string) => {
        console.log("Button pressed", button)
    };

    render() {
        const { keyboardRef = noop, onChange = noop } = this.props;

        return (
            <Keyboard
                keyboardRef={keyboardRef}
                theme="hg-theme-default myTheme1"
                layoutName="default"
                layout= {{
                    default: ["1 2 3", "4 5 6", "7 8 9", "valider 0 <", "Paiement"]
                }}
                onChange={onChange}
                onKeyPress={this.onKeyPress}
            />
        );
    }
}

export {KeyboardWrapper}
export type { KeyboardReactInterface }

