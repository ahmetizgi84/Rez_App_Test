import React, {Component} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {DataContext} from '../Context';

export class Home extends Component {
  static contextType = DataContext;

  render() {
    const {
      cart,
      loading,
      total,
      _reduction,
      _increase,
      _remover,
    } = this.context;
    return (
      <View style={styles.container}>
        {loading ? (
          <View style={styles.indiwrapper}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <View style={styles.contentwrapper}>
            {cart && cart.length > 0 ? (
              <ScrollView>
                <List
                  cart={cart}
                  reduction={_reduction}
                  increase={_increase}
                  remove={_remover}
                />
              </ScrollView>
            ) : (
              <View style={styles.emptycontentwrapper}>
                <Text>Rezerve ürün bulunmuyor</Text>
              </View>
            )}
            <View style={styles.floating}>
              <Text style={styles.amount}>Toplam</Text>
              <Text style={styles.amount}>{total}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Home;

const List = ({cart, reduction, increase, remove}) => {
  return (
    cart &&
    cart.map((item) => (
      <View key={item.id} style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.title}>{item.price}</Text>

        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => increase(item.id)}>
            <Text style={[styles.counterBtn]}>+</Text>
          </TouchableOpacity>
          <Text style={styles.wrapperText}>{item.qty}</Text>
          <TouchableOpacity onPress={() => reduction(item.id)}>
            <Text style={[styles.counterBtn]}>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => remove(item.id)}>
          <Text style={styles.deleteBtn}>Sil</Text>
        </TouchableOpacity>
      </View>
    ))
  );
};

// STYLES _______________________________________________________________________________________
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indiwrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentwrapper: {
    flex: 1,
  },

  emptycontentwrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    backgroundColor: '#ddd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
  },

  wrapper: {
    flexDirection: 'row',
  },

  wrapperText: {
    marginHorizontal: 15,
  },

  counterBtn: {
    backgroundColor: '#fff',
    width: 24,

    textAlign: 'center',
    borderRadius: 5,
  },

  deleteBtn: {
    color: 'red',
  },

  floating: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 10,
    elevation: 5,
  },

  amount: {
    color: '#fff',
    fontSize: 16,
  },
});
