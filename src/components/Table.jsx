import React from 'react';
import moment from 'moment';

class Table extends React.Component {
  render() {
    console.log(this.props.secrets);
    return (
      <div className="scr-list">
        <div className="scr-header scr-row">
          <div className="scr-data">Label</div>
          <div className="scr-data">Content</div>
          <div className="scr-data">Date Created</div>
          <div className="scr-data">Release Date</div>
        </div>
        {this.props.secrets.map(scr => (
          <div className="scr-row" key={scr.secret_id}>
            <div className="scr-data">{scr.secret_label}</div>
            <div className="scr-data">{scr.secret_body}</div>
            <div className="scr-data">{scr.creation_date}</div>
            <div className="scr-data">{scr.release_date}</div>
          </div>
        ))}
      </div>
    );
  }
}

// function Table(props) {
//   return (
//     <div className="scr-list">
//       <div className="scr-header scr-row">
//         <div className="scr-data">Label</div>
//         <div className="scr-data">Content</div>
//         <div className="scr-data">Date Created</div>
//         <div className="scr-data">Release Date</div>
//       </div>
//       {this.props.secrets.map(scr => (
//         <div className="scr-row" key={scr.secret_id}>
//           <div className="scr-data">{scr.secret_label}</div>
//           <div className="scr-data">{scr.secret_body}</div>
//           <div className="scr-data">{scr.creation_date}</div>
//           <div className="scr-data">{scr.release_date}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

export default Table;