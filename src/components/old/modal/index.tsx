import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}


interface Props {
    childs?: [...[React.ReactElement]]
    open?: boolean
}

const BasicModal = (props: Props) => {
    const open = !!props.open, childs=props.childs??[]
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {childs.map(x => x)}
                </Box>
            </Modal>
        </div>
    )
}

export default BasicModal
