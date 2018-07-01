// @flow

const getColor = (voteScore: number) =>
  (voteScore === 0 // eslint-disable-line no-nested-ternary
    ? 'transparent'
    : voteScore > 0
      ? '#D9EAD3'
      : '#F4CCCC');

export default getColor;
