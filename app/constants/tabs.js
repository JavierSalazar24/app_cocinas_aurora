import React from 'react';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconI from 'react-native-vector-icons/MaterialCommunityIcons';
export default tabs = {
  dias: [
    { id: 'lunes', title: 'Lunes' },
    { id: 'martes', title: 'Martes' },
    { id: 'miercoles', title: 'Miercoles' },
    { id: 'jueves', title: 'Jueves' },
    { id: 'viernes', title: 'Viernes' },
  ],
  faq: [
    { id: 'Métodos de pago', title: <Icon5 size={20} name="money-bill-alt" /> },
    { id: 'Pedidos', title: <IconI size={20} name="food-variant" /> },
    { id: 'Seguridad', title: <IconM size={20} name="security" /> },
    { id: 'Higiene', title: <IconM size={20} name="clean-hands" /> },
  ],
};
