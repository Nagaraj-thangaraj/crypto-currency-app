
import './App.css';
import Crypto from './Crypto-App/Crypto'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  responsiveTable: {
    overflowX: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.responsiveTable}>
    <Crypto />
    </div>

  );
}

export default App;
