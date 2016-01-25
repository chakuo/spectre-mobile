'use strict';

import React, {TabBarIOS} from 'react-native';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        let style = {};

        return (
            <TabBarIOS>
                <TabBarIOS.Item title='Blue Tab'>
                </TabBarIOS.Item>
                <TabBarIOS.Item title='Red Tab'>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}