import {CDropdown, CDropdownToggle ,CDropdownMenu, CDropdownItem} from '@coreui/react'

function Sidebar({chats, onAddchat, active, setActive, toggle}) {

    
    
    function removeTags(str) {
        if ((str === null) || (str === ""))
            return null;
        else
            str = str.toString();
              
        return str.replace( /(<([^>]+)>)/ig, '');
    }
    //<button onClick={onAddchat}>+</button>

    return (
    
        <div className={`sidebars`}>
            <div className="sidebars-header">
                <h1>Chats</h1>

                <CDropdown>
                    <CDropdownToggle color="secondary">+</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem onClick={onAddchat} href="#">ChatGPT 3.5</CDropdownItem>
                        <CDropdownItem href="#">ChatGPT 4</CDropdownItem>
                        <CDropdownItem href="#">Dalle 2</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>

            </div>

            <div className="sidebar-notes">

                {chats.map((chat) => (
                   
                    <div key={chat.chatId} className={`sidebar-note ${chat.chatId === active && "active"}`} onClick={() => {setActive(chat.chatId)}}>

                        <div className="sidebar-note-title">
                            <strong>{chat.chatTitle === "" ? "Untitled" : chat.chatTitle && chat.chatTitle.slice(0, 20)}</strong>
                        </div>
                        

                    </div>
                    
                ))}

            </div>

        </div>
   
    
    );

}


export default Sidebar;

