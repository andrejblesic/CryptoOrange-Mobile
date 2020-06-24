import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default function Pagination({currPage, lastPage, prevPageUrl, nextPageUrl, firstPageUrl, lastPageUrl, loadPage}) {

    useEffect(() => {
        console.log('CURRENT PAGE INFO', typeof currPage, currPage);
    })

    return(
        <View style={styles.paginationWrapperStyle}>
            <View style={styles.paginationGroupWrapperStyle}>
                {currPage > 1 && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(firstPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}>{'<<'}</Text></TouchableOpacity>}
                {currPage > 1 && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(prevPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}>{'<'}</Text></TouchableOpacity>}
            </View>
            <View style={styles.paginationGroupWrapperStyle}>
                {currPage < lastPage && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(nextPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}> {'>'} </Text></TouchableOpacity>}
                {currPage < lastPage && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(lastPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}> {'>>'} </Text></TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paginationWrapperStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paginationGroupWrapperStyle: {
        margin: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paginationBtnStyle: {
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 3,
        width: 40,
        height: 30,
        margin: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});