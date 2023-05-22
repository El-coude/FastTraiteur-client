import React, { forwardRef, useState } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { InputProps } from "../../components/Input";
import * as ImagePicker from "expo-image-picker";

export type FileInputProps = InputProps & {
    defaultImageSrc: ImageSourcePropType;
    onSelection: (uri: string) => void;
};

const FileInput = forwardRef<{}, FileInputProps>((props, ref) => {
    const [selected, setSelected] = useState<ImageSourcePropType | null>(null);

    const selectFile = async () => {
        try {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                allowsEditing: false,
                aspect: [4, 3],
            });
            if (!pickerResult.canceled) {
                let uri = `data:image/jpg;base64,${
                    pickerResult.assets![0].base64 as string
                }`;
                setSelected({
                    uri,
                });
                props.onSelection(uri);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View className="w-full">
            <Text
                className={`font-bold w-full text-xs text-grey-2 ${props.labelStyle}`}>
                {props.label}
            </Text>
            <View
                {...props}
                className={`w-40 h-40 m-auto rounded-full border border-grey-2 overflow-hidden ${props.className}`}
                onTouchEnd={selectFile}>
                <Image
                    source={selected || props.defaultImageSrc}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
        </View>
    );
});

export default FileInput;
