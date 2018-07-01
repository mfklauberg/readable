// @flow

import { subHours, formatDistanceStrict } from 'date-fns';

const getTimeSince = (timestamp: number) =>
  `${formatDistanceStrict(subHours(new Date(timestamp), 0), new Date())} ago`;

export default getTimeSince;
