export function Input({ refInput, placeholder }: { placeholder: string; refInput: any }) {
    return <div>
        <input type={"text"} ref={refInput} placeholder={placeholder} className="px-4 py-2 border m-2" />
    </div>
}