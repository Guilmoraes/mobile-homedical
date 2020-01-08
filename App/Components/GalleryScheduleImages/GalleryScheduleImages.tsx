import * as React from 'react';
import {Image, View, Animated, TouchableOpacity} from 'react-native';
import styles from './GalleryScheduleImagesStyles';
import {File} from '../../Models/File';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {Images} from '../../Themes';
import StringUtils from "../../Utils/StringUtils";
import { debug } from '../../Utils/log';


interface Props {
    scheduleImages: File[];
    deleteIsEnabled?: boolean;
    deleteAction?: (scheduleImage: File) => void;
}

export class GalleryScheduleImages extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    private handleImageFullScreenPressed = (item: File) => {
        NavigationActions.documentFullScreen({document: item, handleDeletePressed: this.props.deleteAction});
    };

    private renderItem = (scheduleImage: File, index: number): JSX.Element => {
        const onPressImage = scheduleImage.fileMobilePath && !!this.props.deleteIsEnabled ?
            () => this.handleImageFullScreenPressed(scheduleImage) : () => null;
        const image = !StringUtils.isEmpty(scheduleImage.url) ? {uri: scheduleImage.url} :
            (scheduleImage.fileMobilePath ? {uri: scheduleImage.fileMobilePath} : Images.backgroundEmptyImage);
        return (
            <View style={styles.itemContainer} key={index}>
                <TouchableOpacity
                    onPress={() => onPressImage}
                    style={styles.fileContainerStyle}>
                    <Image style={styles.fileImageStyle} source={image}/>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.imagesContainer}>
                {this.props.scheduleImages != null && this.props.scheduleImages.map(
                    (scheduleImage: File, index: number) => this.renderItem(scheduleImage, index))}
            </View>
        )
    }
}

export default GalleryScheduleImages;
