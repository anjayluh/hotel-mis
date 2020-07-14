import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: { message: "", stack: "" },
    errorInfo: { componentStack: "" },
    hasError: false,
  };
  static propTypes: { children: PropTypes.Validator<object>; };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo:any) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div>
          <p>
            An error has occurred in this page.{' '}
            <span
              style={{ cursor: 'pointer', color: '#0077FF' }}
              onClick={() => {
                window.location.reload();
              }}
            >
                Reload this page
              </span>{' '}
          </p>
        </div>

      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};
