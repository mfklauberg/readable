import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 4px;
`;

const Text = styled.span`
  font-size: 16px;
`;

const Link = Text.extend`
  cursor: pointer;

  ${props => props.selected && 'text-decoration: underline;'}

  &::before {
    content: '';
    margin: 6px;
  }
`;

type FilterItem = {
  key: string,
  display: string,
};

type FilterProps = {
  onFilter: Function,
  filters: Array<FilterItem>,
}

type FilterState = {
  selectedFilters: Array<string>,
}

class Filter extends Component<FilterProps, FilterState> {
  static defaultProps = {
    filters: [
      { display: 'Date', key: 'timestamp' },
      { display: 'Points', key: 'voteScore' },
    ],
  };

  state = {
    selectedFilters: [],
  };

  onFilterClick = (key) => {
    const { onFilter } = this.props;

    const callback = () => onFilter(this.state.selectedFilters);

    this.setState((prevState) => {
      const { selectedFilters: prevSelectedFilters } = prevState;

      const selectedFilters = prevSelectedFilters.includes(key) ?
        [...prevSelectedFilters.filter(f => f !== key)] :
        [...prevSelectedFilters.concat(key)];

      return { selectedFilters };
    }, callback);
  };

  render() {
    const { filters } = this.props;
    const { selectedFilters } = this.state;

    return (
      <Wrapper>
        <Text>Filter by:</Text>
        {
          filters.map(({ display, key }) => (
            <Fragment key={key}>
              <Link
                onClick={() => this.onFilterClick(key)}
                selected={selectedFilters.includes(key)}
              >
                {`${display}`}
              </Link>
            </Fragment>
          ))
        }
      </Wrapper>
    );
  }
}

export default Filter;
