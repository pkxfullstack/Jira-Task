import React, { useEffect, useState } from 'react'

interface toggleProps {
    initialValue?: boolean
}

const useToogle = (
    { initialValue = false }: toggleProps = {}
) => {
    const [value, setValue] = useState(initialValue);
    const toggle = () => {
        setValue(!value)
    }

    return { value, toggle };
}

export default useToogle