export function Input({ refInput, placeholder }: { placeholder: string; refInput: any }) {
    return <div className="">
        <input type={"text"} ref={refInput} placeholder={placeholder} className="px-1 border m-2" />
    </div>
}