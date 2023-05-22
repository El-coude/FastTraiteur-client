import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import {
    useController,
    Control,
    FieldValues,
    ControllerRenderProps,
} from "react-hook-form";

export type InputProps = TextInputProps & {
    label?: string;
    labelStyle?: string;
    className?: string;
    control?: Control<FieldValues, any>;
    name: string;
};
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
    let field: ControllerRenderProps<FieldValues, string> | undefined;
    if (props.control)
        field = useController({
            control: props.control,
            defaultValue: "",
            name: props.name,
        }).field;
    return (
        <View className="w-full">
            <Text
                className={`font-bold w-full text-xs text-grey-2 ${props.labelStyle}`}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                ref={ref}
                className={`font-bold rounded-md bg-transparent p-2 border border-gray-400 my-1 w-full ${props.className}`}
                value={field?.value}
                onChangeText={field?.onChange || props.onChangeText}
            />
        </View>
    );
});

export default Input;
