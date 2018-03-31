import React from 'react';
import { withRouter } from 'react-router-dom';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default () => {
  return (
    <div>
    <PrivateHeader title="Dashboard"/>
    <div className="page-content">
      <NoteList/>
  </div>
  </div>
  );
};


// export default class Dashboard extends React.Component {
//   render() {
//     return (
//       <div>
//       <PrivateHeader title="Your Links"/>
//       <LinksList/>
//       <AddLink/>
//     </div>
//     );
//   }
// }
