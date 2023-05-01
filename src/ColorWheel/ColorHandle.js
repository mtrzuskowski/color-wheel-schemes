const Handle = ({ x, y, size, mouseDown, mouseUp }) => {
  return (
    <div
      onMouseDown={mouseDown ? mouseDown : null}
      onMouseUp={mouseUp ? mouseUp : null}
      className="support-handle"
      style={{
        top: y,
        left: x,
        width: size / 25,
        height: size / 25,
      }}
    />
  )
}

export default Handle
