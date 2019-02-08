Just like componentDidMount(), the componentDidUpdate() is called after all of the children are updated. Just to refresh your memory, A.0.0 will have componentDidUpdate() called first, then A.0, then finally A.






import { SignInView } from './views/SignInView'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'


const App = () => (
  <div>
    <Router>
      <AuthProvider>
        <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/" component={Landing} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
)

import { AuthConsumer } from './Auth/AuthContext'
const SignInView = () => (
  <Router>
    <AuthProvider>
      <Container>
        <Row>
          <h1>TimeLockr</h1>
        </Row>
        <Row>
          <LoginForm />
        </Row>
      </Container>
    </AuthProvider>
  </Router>
)