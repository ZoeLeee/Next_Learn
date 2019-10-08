const withLess = require('@zeit/next-less')

if(typeof require !=='undefined'){
  // require.extensions('.less')=file=>{};
}

const config = withLess(
  {
   
    lessLoaderOptions: {
      cssModules: true,
      javascriptEnabled: true,
    },
  }
);
module.exports = config;