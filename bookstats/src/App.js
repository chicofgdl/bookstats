import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import Bookshelves from "./pages/BookShelves";
import { gapi } from "gapi-script";

function App() {
    useEffect(() => {
        const initializeGapi = async () => {
            try {
                await gapi.load("client:auth2", () => {
                    gapi.client.init({
                        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        scope: "https://www.googleapis.com/auth/books",
                    }).then(() => {
                        // Verifica se já existe um token no localStorage
                        const authInstance = gapi.auth2.getAuthInstance();
                        if (localStorage.getItem("authToken")) {
                            authInstance.isSignedIn.listen(updateSignInStatus);
                            if (authInstance.isSignedIn.get()) {
                                updateSignInStatus(true);
                            } else {
                                signInSilently();
                            }
                        } else {
                            signInSilently();
                        }
                    });
                });
            } catch (error) {
                console.error("Erro ao inicializar o gapi:", error);
            }
        };

        // Função para realizar o login automático silencioso
        const signInSilently = () => {
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.signIn().then((googleUser) => {
                const authToken = googleUser.getAuthResponse().access_token;
                localStorage.setItem("authToken", authToken);
                console.log("Autenticado automaticamente:", authToken);
            }).catch(error => {
                console.error("Erro na autenticação automática:", error);
            });
        };

        // Atualiza o estado de autenticação
        const updateSignInStatus = (isSignedIn) => {
            if (isSignedIn) {
                const authToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                localStorage.setItem("authToken", authToken);
            } else {
                console.log("Usuário não está autenticado.");
            }
        };

        initializeGapi();
    }, []);
    return (
        <ThemeProvider>
            <Router>
                <SearchProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/books/:id" element={<BookDetails />} />
                        <Route path="/bookshelves" element={<Bookshelves />} />
                    </Routes>
                </SearchProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
