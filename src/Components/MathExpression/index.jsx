import React from 'react';
import PropTypes from 'prop-types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const MathExpression = ({ opt }) => {
  return (
    <MathJaxContext>
      <MathJax inline dynamic>
        {opt?.math_expression}
      </MathJax>
    </MathJaxContext>
  );
};

MathExpression.propTypes = {
  opt: PropTypes.object
};

export default React.memo(MathExpression);



// import React from 'react'
// import PropTypes from 'prop-types'
// import { MathJaxProvider, MathJaxNode } from '@yozora/react-mathjax'

// const MathExpression = ({ opt }) => {
//   return (
//     <MathJaxProvider>
//         <MathJaxNode inline formula={opt?.math_expression} />
//     </MathJaxProvider>
//   )
// }
// export default React.memo(MathExpression)

// MathExpression.propTypes = {
//   opt: PropTypes.object
// }
