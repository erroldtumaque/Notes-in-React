import React from 'react';
import { withRouter } from 'react-router-dom';

import PrivateHeader from './PrivateHeader';

export default () => {
  return (
    <div>
    <PrivateHeader title="Dashboard"/>
    <div className="page-content">
      Dashboard page content.
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
