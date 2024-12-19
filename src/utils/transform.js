import * as babel from '@babel/standalone'

export const transform = (jsxCode) => {
  
  return babel.transform(jsxCode, {
    presets: ['env', 'react'],
    
  })
}
