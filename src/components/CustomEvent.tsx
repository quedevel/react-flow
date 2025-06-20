// @ts-ignore
const CustomEvent = ({event}) => {
  return (
    <div
      style={{
        display: 'flex',
        padding: "5px",
        borderRadius: "5px",
        color: "black",
        alignItems: "center",
      }}
      onClick={() => console.log(event.id)}
    >
      <div style={{
        backgroundColor: '#A6CE39',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '5px',
      }}></div>
      <div className={event.status}>{`${event.title} `}</div>
    </div>
  );
}

export default CustomEvent