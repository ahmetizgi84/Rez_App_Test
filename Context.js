import React, {Component} from 'react';

export const DataContext = React.createContext();

const data = require('./data.json');

export class DataProvider extends Component {
  state = {
    cart: null,
    loading: false,
    total: 0,
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  componentDidMount() {
    this._getData();
  }

  // GATHERING DATA___________________________________________________________________________________
  _getData = () => {
    this.setState({loading: true}, () => {
      setTimeout(() => {
        this.setState({
          cart: data.cart,
          loading: false,
        });
        this._getTotalAmount();
      }, 2000);
    });
  };

  // CALC TOTAL CART PRICE ___________________________________________________________________________
  _getTotalAmount = () => {
    const {cart} = this.state;
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    this.setState({
      total,
    });
  };
  // ___________________________________________________________________________________________________

  // DECREASE ITEM QUANTITY ___________________________________________________________________________
  _reduction = (id) => {
    const {cart} = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.qty === 1 ? (item.qty = 1) : (item.qty -= 1);
      }
    });

    this.setState({cart: cart});
    this._getTotalAmount();
  };
  // ___________________________________________________________________________________________________

  // INCREASE ITEM QUANTITY ____________________________________________________________________________
  _increase = (id) => {
    const {cart} = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.qty += 1;
      }
    });
    this.setState({cart: cart});
    this._getTotalAmount();
  };
  // ___________________________________________________________________________________________________

  // REMOVE ITEM _______________________________________________________________________________________
  _remover = (id) => {
    const {cart} = this.state;
    cart.forEach((item, index) => {
      if (item.id === id) {
        cart.splice(index, 1);
      }
    });
    this.setState({cart: cart});
    this._getData();
  };
  // ____________________________________________________________________________________________________

  render() {
    const {cart, loading, total} = this.state;
    const {_reduction, _increase, _remover} = this;
    return (
      <DataContext.Provider
        value={{
          cart,
          loading,
          total,
          _reduction,
          _increase,
          _remover,
        }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
