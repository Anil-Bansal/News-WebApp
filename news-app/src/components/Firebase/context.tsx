import React from 'react';
 
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => (props: any) => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
 
export default FirebaseContext;