import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps
	extends React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> {
	children: React.ReactNode
	labelText?: string
	index?: string
	errors?: FieldErrors<FieldValues>
	renderLabel?: boolean
	name: string
	loading?: boolean
	register?: UseFormRegister<any>
}

export const Select: React.FC<SelectProps> = ({
	labelText,
	errors,
	renderLabel,
	index,
	onChange,
	children,
	register,
	name,
	className,
	loading,
	...restProp
}) => {
	const errorText = errors?.[name]?.message as string
	return (
		<div className="relative">
			<label htmlFor="location" className="block mr-2 mb-1 mt-4 text-base font-medium text-gray-700">
				{labelText}
			</label>
			<select
				{...restProp}
				{...(register?.(name) ?? {})}
				className={clsx(
					'mt-1 block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6 outline-none',
					className
				)}
				onChange={onChange}>
				{children}
			</select>
			{errorText && <p className="text-xs mt-1 text-red-600">{errorText}</p>}
		</div>
	)
}
