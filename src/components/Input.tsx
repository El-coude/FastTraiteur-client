import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps } from "react-native";
import { useController, Control, FieldValues } from "react-hook-form";

export type InputProps = TextInputProps & {
    label?: string;
    labelStyle?: string;
    className?: string;
    control?: Control<FieldValues, any>;
    name: string;
};
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
    const { field } = useController({
        control: props.control,
        defaultValue: "",
        name: props.name,
    });
    return (
        <>
            <Text className={`font-bold w-full ${props.labelStyle}`}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                ref={ref}
                className={`rounded-lg bg-white border border-gray-300 p-2 my-2 w-full ${props.className}`}
                value={field.value}
                onChangeText={field.onChange}
            />
        </>
    );
});

export default Input;
