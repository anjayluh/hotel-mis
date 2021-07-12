// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  overrides,
  palette,
  typography
});
export default theme;
