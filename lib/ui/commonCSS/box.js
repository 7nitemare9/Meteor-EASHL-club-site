import Colors from './colors.js';

export default Box = {
  box: {
    background: Colors.darkGrey,
    //border: `1px solid ${Colors.lightGrey}`,
    //borderRadius: '4px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    width: '100%'
  },
  header: {
    background: 'url(/assets/head_bg.png) repeat-x',
    textAlign: 'right',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  }

}
