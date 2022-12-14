import { Label, Input } from './styled'

export const Filter = ({ onChange, value }) => {
    return (
        <Label>
            Fint contacts by name
            <Input
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            >
            </Input>
        </Label>
    )
}