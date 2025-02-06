import { StyleSheet } from 'react-native';
import scaling from '../../resource/normalize';
import colors from '../../resource/colors';

const styles = StyleSheet.create({
    closeIconView: {
        alignItems: 'flex-end',
        marginTop: scaling.heightScale(10),
        marginRight: scaling.widthScale(10)
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaling.widthScale(10),
        marginTop: scaling.heightScale(20)
    },
    profilePic: {
        width: scaling.widthScale(50),
        height: scaling.widthScale(50),
        borderRadius: scaling.widthScale(50),
    },
    nameLabel: {
        color:colors.black,
        fontSize: scaling.normalize(12),
        fontFamily: 'Raleway-Medium'
    },
    tabView: {
        marginTop: scaling.heightScale(20),
       
    },
    tab: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeTab: {
        backgroundColor: 'rgba(0, 123, 255, 0.48)'
    },
    tabLabel: {
        fontSize: scaling.normalize(16),
        fontFamily: 'Raleway-Medium'
    },
    logOutTab: {
        marginTop: scaling.heightScale(100)
    }
})

export default styles;