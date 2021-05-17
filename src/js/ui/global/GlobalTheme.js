import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif'
    }
});
theme = responsiveFontSizes(theme);

export default theme;