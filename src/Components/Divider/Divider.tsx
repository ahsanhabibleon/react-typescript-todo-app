import { DividerPropTypes } from "./Divider.types"

const Divider = ({ style }: DividerPropTypes) => {
    return (
        <div
            className="divider"
            style={
                {
                    borderBottom: style?.borderBottom || '1px solid #ccc',
                    height: style?.height || '0',
                    margin: style?.margin || '0 0 30px',
                    ...style
                }
            }
        />
    )
}

export default Divider