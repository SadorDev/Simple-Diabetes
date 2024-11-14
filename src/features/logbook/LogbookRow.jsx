const LogbookRow = ({ entry }) => {
    return (
      <tr>
        <td>{new Date(entry.created_at).toLocaleDateString()}</td>
        <td>{new Date(entry.created_at).toLocaleTimeString()}</td>
        <td>{entry.reading}</td>
        <td>{entry.notes}</td>
      </tr>
    );
  };
  
  export default LogbookRow;
  